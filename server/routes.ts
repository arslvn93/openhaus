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
      
      if (!section || !config) {
        return res.status(400).json({
          message: "Missing required fields: section and config"
        });
      }
      
      // Path to the siteConfig.ts file
      const configFilePath = path.resolve('./client/src/config/siteConfig.ts');
      
      // Read the current file
      let configFileContent = fs.readFileSync(configFilePath, 'utf8');
      
      // Create a backup of the original file
      const backupPath = `${configFilePath}.backup`;
      fs.writeFileSync(backupPath, configFileContent);
      
      // For each key in config, update the corresponding export in the file
      Object.keys(config).forEach(key => {
        const configData = config[key];
        
        // Convert the config data to a string representation
        const configString = JSON.stringify(configData, null, 2)
          // Replace double quotes around property names with nothing
          .replace(/"([^"]+)":/g, '$1:')
          // Add appropriate spacing
          .replace(/\n/g, '\n  ');
        
        // Create a regex to find the export declaration for this property
        const exportRegex = new RegExp(`export const ${key} = ([\\s\\S]*?);(\\n|\\r\\n)`, 'g');
        
        // Replace the export with the new config
        configFileContent = configFileContent.replace(
          exportRegex, 
          `export const ${key} = ${configString};\n`
        );
      });
      
      // Write the updated content back to the file
      fs.writeFileSync(configFilePath, configFileContent);
      
      res.status(200).json({
        message: `Successfully updated ${section} configuration`
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      res.status(500).json({
        message: "Failed to update configuration. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
