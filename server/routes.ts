import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import * as fs from 'fs';
import * as path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for RSVP form submission
  app.post("/api/rsvp", async (req: Request, res: Response) => {
    try {
      // Validate form data using the zod schema
      const validatedData = insertRsvpSchema.parse(req.body);
      
      // Check if the user already RSVP'd with the same email
      const existingRsvp = await storage.getRsvpByEmail(validatedData.email);
      
      if (existingRsvp) {
        // Update the existing RSVP
        const updatedRsvp = await storage.createRsvp({
          ...validatedData,
        });
        return res.status(200).json({
          message: "Your RSVP has been updated",
          rsvp: updatedRsvp
        });
      }
      
      // Create a new RSVP entry
      const rsvp = await storage.createRsvp(validatedData);
      
      return res.status(201).json({
        message: "Thank you for your RSVP! We look forward to seeing you at the open house.",
        rsvp
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      console.error("Error processing RSVP:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your RSVP" 
      });
    }
  });

  // Get all RSVPs (could be protected in a real app)
  app.get("/api/rsvp", async (_req: Request, res: Response) => {
    try {
      const rsvps = await storage.getRsvps();
      return res.status(200).json(rsvps);
    } catch (error) {
      console.error("Error retrieving RSVPs:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving RSVPs" 
      });
    }
  });

  // Get RSVP by ID
  app.get("/api/rsvp/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const rsvp = await storage.getRsvpById(id);
      if (!rsvp) {
        return res.status(404).json({ message: "RSVP not found" });
      }
      
      return res.status(200).json(rsvp);
    } catch (error) {
      console.error("Error retrieving RSVP:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving the RSVP" 
      });
    }
  });

  // Update site configuration
  app.post("/api/config/update", async (req: Request, res: Response) => {
    try {
      const { section, config } = req.body;
      
      console.log(`Updating configuration for section: ${section}`);
      console.log('Configuration data received:', JSON.stringify(config, null, 2));
      
      if (!section || !config) {
        console.error("Missing required fields: section or config");
        return res.status(400).json({
          message: "Missing required fields: section and config"
        });
      }
      
      // Path to the siteConfig.js file
      const configFilePath = path.resolve('./client/src/config/siteConfig.js');
      console.log(`Config file path: ${configFilePath}`);
      
      // Create a completely new configuration file with all the updated values
      // This is safer than doing regex replacements on the existing file
      
      // First, get all existing configs from the module
      let allConfigs: Record<string, any> = {};
      
      try {
        // Directly load the module to get the latest values
        // This avoids any issues with regex parsing
        const configModule = await import(`${process.cwd()}/client/src/config/siteConfig.js`);
        
        // Get all exports from the module
        for (const key of Object.keys(configModule)) {
          if (key !== '__esModule') { // Skip the __esModule marker
            allConfigs[key] = configModule[key];
          }
        }
        
        // Override with the new values
        for (const key of Object.keys(config)) {
          allConfigs[key] = config[key];
        }
      } catch (err) {
        console.error("Error loading existing config:", err);
        // If we can't load the module, just use the provided config
        allConfigs = { ...config };
      }
      
      // Read the current file for backup purposes
      let originalContent = "";
      try {
        originalContent = fs.readFileSync(configFilePath, 'utf8');
        
        // Create a backup of the original file
        const backupPath = `${configFilePath}.backup`;
        fs.writeFileSync(backupPath, originalContent);
        console.log(`Created backup at: ${backupPath}`);
      } catch (err) {
        console.warn("Could not create backup, file might not exist yet:", err);
      }
      
      // Helper function to format a value as a JS string
      const formatValue = (val: any, indent = 2): string => {
        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        
        if (typeof val === 'string') {
          return `"${val.replace(/"/g, '\\"')}"`;
        }
        
        if (typeof val === 'number' || typeof val === 'boolean') {
          return String(val);
        }
        
        if (Array.isArray(val)) {
          if (val.length === 0) return '[]';
          
          const innerIndent = ' '.repeat(indent + 2);
          const items = val.map(item => 
            `${innerIndent}${formatValue(item, indent + 2)}`
          ).join(',\n');
          
          return `[\n${items}\n${' '.repeat(indent)}]`;
        }
        
        if (typeof val === 'object') {
          const keys = Object.keys(val);
          if (keys.length === 0) return '{}';
          
          const innerIndent = ' '.repeat(indent + 2);
          const items = keys.map(key => 
            `${innerIndent}${key}: ${formatValue(val[key], indent + 2)}`
          ).join(',\n');
          
          return `{\n${items}\n${' '.repeat(indent)}}`;
        }
        
        return String(val);
      };
      
      // Generate the new file content
      let newFileContent = `/**
 * Site Configuration
 * This file contains all configurable content for the website
 * Last updated: ${new Date().toISOString()}
 */\n\n`;
      
      // Add each configuration section
      for (const [key, value] of Object.entries(allConfigs)) {
        newFileContent += `// ${key} configuration\n`;
        newFileContent += `export const ${key} = ${formatValue(value, 2)};\n\n`;
      }
      
      // Write the new file
      fs.writeFileSync(configFilePath, newFileContent);
      console.log(`Successfully wrote updated configuration to file`);
      
      res.status(200).json({
        message: `Successfully updated ${section} configuration`
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      
      // Try to restore from backup if possible
      try {
        const configFilePath = path.resolve('./client/src/config/siteConfig.js');
        const backupPath = `${configFilePath}.backup`;
        
        if (fs.existsSync(backupPath)) {
          const backupContent = fs.readFileSync(backupPath, 'utf8');
          fs.writeFileSync(configFilePath, backupContent);
          console.log("Restored configuration from backup");
        }
      } catch (restoreError) {
        console.error("Failed to restore from backup:", restoreError);
      }
      
      res.status(500).json({
        message: "Failed to update configuration. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
