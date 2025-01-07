import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCLtu3I0Y3K8wfq-xyOpsOHiqm1y1iSiNM');

export async function generateResumeContent(prompt, currentContent = '') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(
      `${prompt}\nCurrent content: ${currentContent}`
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateWorkExperience(position, company, duration, industry) {
  const prompt = `Generate professional work experience bullet points for a ${position} position at ${company} for ${duration}. 
  Focus on quantifiable achievements and impactful contributions in the ${industry} industry. 
  Format the response as bullet points starting with strong action verbs.`;
  return generateResumeContent(prompt);
}

export async function generateEducation(degree, institution, field) {
  const prompt = `Generate a professional education description for a ${degree} in ${field} from ${institution}.
  Include relevant coursework, academic achievements, and any special projects or research.
  Format as a concise paragraph highlighting key academic accomplishments.`;
  return generateResumeContent(prompt);
}

export async function generateSkills(jobTitle, experience, industry) {
  const prompt = `Generate a comprehensive list of technical and soft skills for a ${jobTitle} with ${experience} years of experience in the ${industry} industry.
  Include both technical skills and soft skills relevant to the role.
  Format as a comma-separated list of skills, prioritizing the most relevant ones first.`;
  return generateResumeContent(prompt);
}

export async function generateProject(projectName, technologies, industry) {
  const prompt = `Generate a professional project description for ${projectName} using ${technologies} in the ${industry} industry.
  Include the problem solved, technologies used, and quantifiable results.
  Format as a concise paragraph with emphasis on technical implementation and business impact.`;
  return generateResumeContent(prompt);
}

export async function improveContent(section, content) {
  const prompt = `Improve the following ${section} content for a resume, making it more professional and impactful:\n${content}
  Focus on:
  - Using strong action verbs
  - Including quantifiable achievements
  - Being concise yet descriptive
  - Maintaining professional tone`;
  return generateResumeContent(prompt);
}

export async function generateFullResume(userData) {
  const prompt = `Generate a professional resume for a ${userData.jobTitle} with ${userData.experience} years of experience in ${userData.industry}.
  Include the following sections:
  1. Professional Summary
  2. Work Experience at ${userData.companies.join(', ')}
  3. Education: ${userData.education.join(', ')}
  4. Skills relevant to ${userData.jobTitle}
  5. Projects using ${userData.technologies.join(', ')}
  
  Focus on:
  - Industry-specific achievements
  - Technical expertise
  - Leadership and soft skills
  - Quantifiable results
  
  Current career objective: ${userData.objective}`;
  
  return generateResumeContent(prompt);
}

export async function generateCoverLetter(jobTitle, company, experience, skills, userBackground) {
  const prompt = `Generate a professional cover letter for a ${jobTitle} position at ${company}.
  Background: ${userBackground}
  Experience: ${experience} years
  Key Skills: ${skills}
  
  Requirements:
  - Professional and engaging tone
  - Clear structure (opening, body paragraphs, closing)
  - Highlight relevant skills and experience
  - Show enthusiasm for the company and role
  - Keep it concise and impactful
  - Include a proper salutation and closing
  
  Format as a complete cover letter with proper paragraphing.`;
  
  return generateResumeContent(prompt);
}

export async function customizeCoverLetter(content, specificRequirements, companyResearch) {
  const prompt = `Customize and improve the following cover letter content:
  
  Original Content:
  ${content}
  
  Job Requirements to Emphasize:
  ${specificRequirements}
  
  Company Research/Values to Include:
  ${companyResearch}
  
  Make the letter more targeted by:
  - Incorporating specific company values and culture
  - Addressing key job requirements
  - Adding relevant achievements
  - Maintaining a professional yet personable tone`;
  
  return generateResumeContent(prompt);
}

export async function generateCoverLetterSection(sectionType, jobDetails, userExperience) {
  const sectionPrompts = {
    opening: `Create an engaging opening paragraph for a cover letter applying for a ${jobDetails.position} at ${jobDetails.company}. 
    Show enthusiasm and briefly mention how you learned about the opportunity.`,
    
    body: `Generate a compelling body paragraph highlighting relevant experience as a ${userExperience.currentRole} 
    that makes you an ideal candidate for the ${jobDetails.position} role. Focus on specific achievements and skills that match the job requirements.`,
    
    closing: `Write a strong closing paragraph for the ${jobDetails.position} position, expressing interest in an interview 
    and thanking the reader for their consideration. Include a professional sign-off.`
  };

  return generateResumeContent(sectionPrompts[sectionType]);
}
