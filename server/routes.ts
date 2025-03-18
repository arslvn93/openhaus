import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

  const httpServer = createServer(app);
  return httpServer;
}
