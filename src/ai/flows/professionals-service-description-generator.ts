'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating professional service descriptions and tags.
 *
 * - generateProfessionalServiceDescription - A function that generates a compelling service description and relevant tags.
 * - ProfessionalsServiceDescriptionGeneratorInput - The input type for the generator function.
 * - ProfessionalsServiceDescriptionGeneratorOutput - The return type for the generator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfessionalsServiceDescriptionGeneratorInputSchema = z.object({
  serviceType: z
    .string()
    .describe('The type of service the professional offers, e.g., "Web Development", "Plumbing", "Tutoring".'),
  skills: z
    .array(z.string())
    .describe('A list of skills the professional possesses, e.g., "JavaScript", "React", "Node.js".'),
  certificateDataUris: z
    .array(z.string())
    .optional()
    .describe(
      "An optional array of data URIs of skill certificates. Each URI must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProfessionalsServiceDescriptionGeneratorInput = z.infer<
  typeof ProfessionalsServiceDescriptionGeneratorInputSchema
>;

const ProfessionalsServiceDescriptionGeneratorOutputSchema = z.object({
  serviceDescription: z
    .string()
    .describe('A compelling and concise service description.'),
  tags: z
    .array(z.string())
    .describe('A list of relevant keywords or tags for the service.'),
});
export type ProfessionalsServiceDescriptionGeneratorOutput = z.infer<
  typeof ProfessionalsServiceDescriptionGeneratorOutputSchema
>;

export async function generateProfessionalServiceDescription(
  input: ProfessionalsServiceDescriptionGeneratorInput
): Promise<ProfessionalsServiceDescriptionGeneratorOutput> {
  return professionalsServiceDescriptionGeneratorFlow(input);
}

const serviceDescriptionPrompt = ai.definePrompt({
  name: 'professionalsServiceDescriptionPrompt',
  input: {schema: ProfessionalsServiceDescriptionGeneratorInputSchema},
  output: {schema: ProfessionalsServiceDescriptionGeneratorOutputSchema},
  prompt: `You are an AI assistant specialized in writing compelling service descriptions and generating relevant tags for professionals.

Given the professional's skills, service type, and details from their uploaded certificates (if provided), generate a concise yet engaging service description and a list of relevant tags.

**Professional Details:**
Service Type: {{{serviceType}}}
Skills:
{{#each skills}}- {{{this}}}
{{/each}}

**Certificates (if available):**
{{#each certificateDataUris}}{{#media url=this}}{{/media}}{{/each}}

Generate a professional service description (around 100-150 words) that highlights their expertise and benefits to clients. Also, provide a list of 5-10 relevant keywords/tags that would help clients find this service.

Output should be a JSON object conforming to the following structure:
serviceDescription: string
tags: string[]`,
});

const professionalsServiceDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'professionalsServiceDescriptionGeneratorFlow',
    inputSchema: ProfessionalsServiceDescriptionGeneratorInputSchema,
    outputSchema: ProfessionalsServiceDescriptionGeneratorOutputSchema,
  },
  async input => {
    const mediaParts = input.certificateDataUris
      ? input.certificateDataUris.map(uri => ({media: {url: uri}}))
      : [];

    const promptInput = {
      serviceType: input.serviceType,
      skills: input.skills,
      certificateDataUris: input.certificateDataUris, // Passed for Handlebars template access
    };

    const {output} = await serviceDescriptionPrompt(promptInput);

    if (!output) {
      throw new Error('Failed to generate service description and tags.');
    }

    return output;
  }
);
