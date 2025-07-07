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
    <div>
      {/* Table */}
      <table className="table table-striped bg-msu-deep-ocean" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Positions</th>
            <th>Salary Grade</th>
            <th>Monthly Salary</th>
            <th>Degree</th>
            <th>Managements</th>
            <th>Experience</th>
            <th>Eligibility</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id}>
              <td>{pos.id}</td>
              <td>{pos.position}</td>
              <td>{pos.salaryGrade}</td>
              <td>{pos.monthlySalary}</td>
              <td>{pos.degree}</td>
              <td>{pos.management}</td>
              <td>{pos.experience}</td>
              <td>{pos.eligibility}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Additional Content */}
     {/* Additional Content */}
<div className="mt-10 text-left px-5 md:px-10 text-msu-deep-ocean">
  <p className="paragraph p2 text-blue mb-5">
    Interested and qualified applicants should signify their interest in writing. Attach the following documents to the application letter and send to the address below not later than <strong>May 14, 2024</strong>.
  </p>
  
  <ul className="ml-5 mb-5 list-disc">
    <li className="mb-2">
      <p className="paragraph p2 text-blue-pure">
        1. Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212, Revised 2017) which can be downloaded at{' '}
        <a
          href="https://csc.gov.ph/downloads/category/223-csc-form-212-revised-2017-personal-data-sheet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-msu-crimson-ground underline"
        >
          www.csc.gov.ph
        </a>
        ;
      </p>
    </li>
    <li className="mb-2">
      <p className="paragraph p2 text-blue-pure">
        2. Performance rating in the last rating period (if applicable);
      </p>
    </li>
    <li className="mb-2">
      <p className="paragraph p2 text-blue-pure">
        3. Certified photocopy of certificate of eligibility/rating/license; and
      </p>
    </li>
    <li className="mb-2">
      <p className="paragraph p2 text-blue-pure">
        4. Certified photocopy of Transcript of Records/other credentials.
      </p>
    </li>
  </ul>

  <p className="paragraph p2 text-blue-pure mb-5">
    QUALIFIED APPLICANTS are advised to hand in or send through courier/email their application to:
  </p>

  {/* Contact Info */}
  <div className="w-full md:w-[400px] mx-auto text-center mb-10">
    <p className="paragraph p2 text-blue-pure underline font-bold">
      Chancellor MARY JOYCE Z. GUINTO-SALI, Ph.D.
    </p>
    <p className="paragraph p2 text-blue-pure underline">
      Thru: Dir. IBRAHIM S. MIGUEL
    </p>
    <p className="paragraph p2 text-blue-pure underline">
      HRDO, MSU-TCTO, Sanga-Sanga, Bongao, Tawi-Tawi
    </p>
    <p className="paragraph p2 text-white-pure underline">
      <a
        href="mailto:hrdo@msutawi-tawi.edu.ph?subject=Application%20Letter"
        className="text-msu-crimson-ground underline"
      >
        hrdo@msutawi-tawi.edu.ph
      </a>
    </p>
  </div>

  <p className="paragraph p2 text-red-600 font-bold text-center mb-5">
    APPLICATIONS WITH INCOMPLETE DOCUMENTS SHALL NOT BE ENTERTAINED.
  </p>
</div>
</div>
  );
};

export default OpenPositionsTable;