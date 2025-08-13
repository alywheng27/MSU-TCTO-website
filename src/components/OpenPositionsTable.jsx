import React from 'react';

const OpenPositionsTable = () => {
  const positions = [
    {
      id: 1,
      position: 'Administrative Aide VI',
      salaryGrade: 6,
      monthlySalary: '₱17,553',
      degree: 'Completion of two year studies in college',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'Career Service (Subprofessional) First Level Eligibility or its equivalent',
    },
    {
      id: 2,
      position: 'Administrative Aide III',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'Elementary School Graduate',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'Pipefitter or Plumber (MC 11, s.96 - Cat. I)',
    },
    {
      id: 3,
      position: 'Administrative Aide III',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'Able to read and write',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'None Required (MC 11, s. 96 - Cat. III)',
    },
    {
      id: 4,
      position: 'Administrative Aide III',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'Able to read and write',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'None Required (MC 11, s. 96 - Cat. III)',
    },
    {
      id: 5,
      position: 'Security Guard I',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'High School Graduate',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'Security Guard License',
    },
    {
      id: 6,
      position: 'Security Guard I',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'High School Graduate',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'Security Guard License',
    },
    {
      id: 7,
      position: 'Security Guard I',
      salaryGrade: 3,
      monthlySalary: '₱14,678',
      degree: 'High School Graduate',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'Security Guard License',
    },
    {
      id: 8,
      position: 'Watchman I',
      salaryGrade: 2,
      monthlySalary: '₱13,819',
      degree: 'Elementary School Graduate',
      management: 'None Required',
      experience: 'None Required',
      eligibility: 'None Required (MC 11, s.96 - Cat III)',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 transition-colors duration-300">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-[#61063B] dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">No.</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Positions</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Salary Grade</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Monthly Salary</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Degree</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Managements</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Experience</th>
              <th className="px-4 py-3 text-left text-white dark:text-white font-semibold border-b border-gray-200 dark:border-gray-600">Eligibility</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700">
            {positions.map((pos, index) => (
              <tr key={pos.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : 'bg-white dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`}>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.id}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 font-medium">{pos.position}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.salaryGrade}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.monthlySalary}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.degree}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.management}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.experience}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">{pos.eligibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Content */}
      <div className="mt-10 text-left px-5 md:px-10 text-gray-900 dark:text-white">
                 <p className="text-gray-700 dark:text-white mb-5">
           Interested and qualified applicants should signify their interest in writing. Attach the following documents to the application letter and send to the address below not later than <strong className="text-[#61063B] dark:text-yellow-500">May 14, 2024</strong>.
         </p>
        
        <ul className="ml-5 mb-5 list-disc space-y-2">
          <li>
            <p className="text-gray-700 dark:text-white">
              1. Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212, Revised 2017) which can be downloaded at{' '}
                             <a
                 href="https://csc.gov.ph/downloads/category/223-csc-form-212-revised-2017-personal-data-sheet"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-[#61063B] dark:text-yellow-500 underline hover:text-[#4a052e] dark:hover:text-yellow-400"
               >
                www.csc.gov.ph
              </a>
              ;
            </p>
          </li>
          <li>
            <p className="text-gray-700 dark:text-white">
              2. Performance rating in the last rating period (if applicable);
            </p>
          </li>
          <li>
            <p className="text-gray-700 dark:text-white">
              3. Certified photocopy of certificate of eligibility/rating/license; and
            </p>
          </li>
          <li>
            <p className="text-gray-700 dark:text-white">
              4. Certified photocopy of Transcript of Records/other credentials.
            </p>
          </li>
        </ul>

        <p className="text-gray-700 dark:text-white mb-5">
          QUALIFIED APPLICANTS are advised to hand in or send through courier/email their application to:
        </p>

        {/* Contact Info */}
        <div className="w-full md:w-[400px] mx-auto text-center mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                     <p className="text-[#61063B] dark:text-yellow-500 underline font-bold">
             Chancellor MARY JOYCE Z. GUINTO-SALI, Ph.D.
           </p>
          <p className="text-gray-700 dark:text-white underline">
            Thru: Dir. IBRAHIM S. MIGUEL
          </p>
          <p className="text-gray-700 dark:text-white underline">
            HRDO, MSU-TCTO, Sanga-Sanga, Bongao, Tawi-Tawi
          </p>
          <p className="text-gray-700 dark:text-white underline">
                         <a
               href="mailto:hrdo@msutawi-tawi.edu.ph?subject=Application%20Letter"
               className="text-[#61063B] dark:text-yellow-500 underline hover:text-[#4a052e] dark:hover:text-yellow-400"
             >
              hrdo@msutawi-tawi.edu.ph
            </a>
          </p>
        </div>

        <div className="text-center mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 font-bold">
            APPLICATIONS WITH INCOMPLETE DOCUMENTS SHALL NOT BE ENTERTAINED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpenPositionsTable;