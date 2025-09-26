import { useSanityClient, groq } from 'astro-sanity';

export async function GET() {
  try {
    console.log('=== DEBUG API: Checking Sanity Database ===');
    
    // Check all document types
    const allTypesQuery = groq`*[_type in ["program", "department", "degree", "level", "duration"]] {
      _type,
      _id,
      title,
      name
    }`;
    
    const allTypes = await useSanityClient().fetch(allTypesQuery);
    console.log('All document types found:', allTypes);
    
    // Check specifically for departments
    const departmentsQuery = groq`*[_type == "department"] {
      _id,
      name,
      title
    }`;
    
    const departments = await useSanityClient().fetch(departmentsQuery);
    console.log('All departments found:', departments);
    
    // Check for COED department specifically
    const coedDepartmentQuery = groq`*[_type == "department" && name == "COED"] {
      _id,
      name,
      title
    }`;
    
    const coedDepartment = await useSanityClient().fetch(coedDepartmentQuery);
    console.log('COED department found:', coedDepartment);
    
    // Check for all programs
    const allProgramsQuery = groq`*[_type == "program"] {
      _id,
      title,
      department->{
        _id,
        name,
        title
      }
    }`;
    
    const allPrograms = await useSanityClient().fetch(allProgramsQuery);
    console.log('All programs found:', allPrograms);

    return new Response(JSON.stringify({ 
      success: true,
      debug: {
        allDocumentTypes: allTypes,
        allDepartments: departments,
        coedDepartment: coedDepartment,
        allPrograms: allPrograms,
        summary: {
          totalDocumentTypes: allTypes?.length || 0,
          totalDepartments: departments?.length || 0,
          coedDepartmentExists: coedDepartment?.length > 0,
          totalPrograms: allPrograms?.length || 0
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error in debug API:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Failed to debug Sanity database'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}



