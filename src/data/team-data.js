// Team data structure - removed faculty counselor, keeping only photos, name, position
export const teamData = {
  executive: {
    chair: {
      name: "Anagh Krishna Singh",
      position: "Chairperson",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Anagh.jpeg",
      bio: "Leading the IEEE Student Branch with vision and dedication.",
      journey: "As the Chairperson of IEEE Student Branch, I oversee all operations and strategic planning."
    },
    viceChair: {
      name: "Aadrikaa Gupta",
      position: "Vice Chairperson",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Aadrika.png",
      bio: "Supporting the Chairperson in leading the branch forward.",
      journey: "Working closely with the Chairperson to ensure smooth operations."
    },
    secretaries: [
      {
        name: "Prateek Raj",
        position: "Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Prateek.png",
        bio: "Managing branch documentation and communications.",
        journey: "Handling all secretarial duties and maintaining records."
      },
      {
        name: "Shreya Yadav",
        position: "Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Shreya.jpeg",
        bio: "Co-managing branch documentation and communications.",
        journey: "Working alongside the team to maintain organizational efficiency."
      }
    ],
    treasurer: {
      name: "Paranjay Soni",
      position: "Treasurer",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Praranjay.jpeg",
      bio: "Managing branch finances and budget planning.",
      journey: "Ensuring financial transparency and efficient resource allocation."
    }
  },
  webDesignTeam: {
    webmasters: [
      {
        name: "Akash Rai",
        position: "Web Master",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Akash.png",
        bio: "Leading web development and technical infrastructure.",
        journey: "Building and maintaining the IEEE website and digital presence."
      }
    ],
    graphicDesigners: []
  },
  technicalTeam: {
    csSecretary: {
      name: "Arindol Sarkar",
      position: "CS Secretary",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Arindol.jpeg",
      bio: "Leading Computer Society initiatives.",
      journey: "Organizing CS-related events and technical sessions."
    },
    csViceSecretaries: [
      {
        name: "Keshav Kashyap",
        position: "CS Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "",
        bio: "Supporting CS initiatives and events.",
        journey: "Assisting in organizing technical workshops and competitions."
      },
      {
        name: "Prashant Singh",
        position: "CS Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Prashant.jpeg",
        bio: "Supporting CS initiatives and events.",
        journey: "Assisting in organizing technical workshops and competitions."
      }
    ],
    rasSecretary: {
      name: "Prajjwal Singh",
      position: "RAS Secretary",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Prajwal.jpeg",
      bio: "Leading Robotics and Automation Society activities.",
      journey: "Organizing robotics workshops, competitions, and technical sessions."
    },
    rasViceSecretaries: [
      {
        name: "Ashutosh Yadav",
        position: "RAS Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Ashutosh.jpeg",
        bio: "Supporting RAS initiatives and robotics events.",
        journey: "Helping organize robotics competitions and technical workshops."
      },
      {
        name: "Naman Shrestha",
        position: "RAS Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Naman Shrestha.png",
        bio: "Co-supporting RAS activities and events.",
        journey: "Working on robotics projects and technical sessions."
      }
    ],
    wieSecretary: {
      name: "Vedanshi Shrivastava",
      position: "WIE Secretary",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Vedanshi.png",
      bio: "Leading Women in Engineering initiatives.",
      journey: "Promoting diversity and organizing WIE events and mentorship programs."
    },
    wieViceSecretaries: [
      {
        name: "Tanya Mittal",
        position: "WIE Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Tanya.png",
        bio: "Supporting WIE initiatives and events.",
        journey: "Helping organize WIE workshops and networking events."
      }
    ],
    comsocSecretary: {
      name: "Krishna Gupta",
      position: "COMSOC Secretary",
      linkedin: "",
      github: "",
      instagram: "",
      image: "/team-images/Krishna.jpeg",
      bio: "Leading Communications Society activities.",
      journey: "Organizing COMSOC events, workshops, and technical sessions."
    },
    comsocViceSecretaries: [
      {
        name: "Naman Patel",
        position: "COMSOC Vice-Secretary",
        linkedin: "",
      github: "",
      instagram: "",
        image: "/team-images/Naman Patel.jpeg",
        bio: "Supporting COMSOC initiatives.",
        journey: "Helping organize communications-related events and workshops."
      }
    ]
  },
  // New designations - these will be populated from backend
  newDesignations: {
    jointSec: [], // Joint_Sec
    design: [], // Design
    audit: [], // Audit
    editorial: [], // Editorial
    wie: [], // WIE
    comsoc: [], // ComSoc
    ras: [], // RAS
    cs: [], // CS
    event: [], // EVENT
    cnm: [], // CNM
    members: [] // Additional Members
  },
  generalMembers: []
};

// Helper function to generate slug from name
export const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Helper function to get member by slug
export const getMemberBySlug = (slug) => {
  const allMembers = [];
  
  // Executive Team
  if (teamData.executive.chair) {
    allMembers.push({ ...teamData.executive.chair, slug: generateSlug(teamData.executive.chair.name) });
  }
  if (teamData.executive.viceChair) {
    allMembers.push({ ...teamData.executive.viceChair, slug: generateSlug(teamData.executive.viceChair.name) });
  }
  teamData.executive.secretaries.forEach((sec) => {
    allMembers.push({ ...sec, slug: generateSlug(sec.name) });
  });
  if (teamData.executive.treasurer) {
    allMembers.push({ ...teamData.executive.treasurer, slug: generateSlug(teamData.executive.treasurer.name) });
  }
  
  // Web & Design Team
  teamData.webDesignTeam.webmasters.forEach((wm) => {
    allMembers.push({ ...wm, slug: generateSlug(wm.name) });
  });
  
  // Technical Team
  if (teamData.technicalTeam.csSecretary) {
    allMembers.push({ ...teamData.technicalTeam.csSecretary, slug: generateSlug(teamData.technicalTeam.csSecretary.name) + '-cs' });
  }
  teamData.technicalTeam.csViceSecretaries.forEach((vsec) => {
    allMembers.push({ ...vsec, slug: generateSlug(vsec.name) + '-cs' });
  });
  if (teamData.technicalTeam.rasSecretary) {
    allMembers.push({ ...teamData.technicalTeam.rasSecretary, slug: generateSlug(teamData.technicalTeam.rasSecretary.name) });
  }
  teamData.technicalTeam.rasViceSecretaries.forEach((vsec) => {
    allMembers.push({ ...vsec, slug: generateSlug(vsec.name) });
  });
  if (teamData.technicalTeam.wieSecretary) {
    allMembers.push({ ...teamData.technicalTeam.wieSecretary, slug: generateSlug(teamData.technicalTeam.wieSecretary.name) });
  }
  teamData.technicalTeam.wieViceSecretaries.forEach((vsec) => {
    allMembers.push({ ...vsec, slug: generateSlug(vsec.name) });
  });
  if (teamData.technicalTeam.comsocSecretary) {
    allMembers.push({ ...teamData.technicalTeam.comsocSecretary, slug: generateSlug(teamData.technicalTeam.comsocSecretary.name) });
  }
  teamData.technicalTeam.comsocViceSecretaries.forEach((vsec) => {
    allMembers.push({ ...vsec, slug: generateSlug(vsec.name) });
  });
  
  return allMembers.find(m => m.slug === slug) || null;
};
