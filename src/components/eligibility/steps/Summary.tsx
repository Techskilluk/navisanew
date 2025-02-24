import { EligibilityData } from '../EligibilityForm';

interface SummaryProps {
  data: Partial<EligibilityData>;
}

const Summary = ({ data }: SummaryProps) => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Summary</h2>
        <p className='text-muted-foreground'>Review your information before submission.</p>
      </div>

      <div className='space-y-6'>
        {data.personalInfo && (
          <div>
            <h3 className='font-semibold mb-2'>Personal Information</h3>
            <div className='space-y-1'>
              <p>Name: {data.personalInfo.fullName}</p>
              <p>Email: {data.personalInfo.email}</p>
              <p>Nationality: {data.personalInfo.nationality}</p>
              <p>Current Location: {data.personalInfo.currentLocation}</p>
            </div>
          </div>
        )}

        {data.education && (
          <div>
            <h3 className='font-semibold mb-2'>Education</h3>
            <div className='space-y-1'>
              <p>Degree: {data.education.degree}</p>
              <p>Field: {data.education.field}</p>
              <p>Institution: {data.education.institution}</p>
              <p>Graduation Year: {data.education.graduationYear}</p>
            </div>
          </div>
        )}

        {data.experience && (
          <div>
            <h3 className='font-semibold mb-2'>Experience</h3>
            <div className='space-y-1'>
              <p>Years of Experience: {data.experience.years}</p>
              <p>Current Role: {data.experience.position}</p>
              <p>Industry: {data.experience.industry}</p>
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className='font-semibold mb-2'>Skills</h3>
            <div className='flex flex-wrap gap-2'>
              {data.skills.map((skill, index) => (
                <span key={index} className='bg-secondary px-3 py-1 rounded-full text-sm'>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <div>
            <h3 className='font-semibold mb-2'>Achievements</h3>
            <div className='space-y-4'>
              {data.achievements.map((achievement, index) => (
                <div key={index} className='space-y-1'>
                  <p className='font-medium'>{achievement.type}</p>
                  <p className='text-muted-foreground'>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.preferredCountries && data.preferredCountries.length > 0 && (
          <div>
            <h3 className='font-semibold mb-2'>Preferred Countries</h3>
            <div className='flex flex-wrap gap-2'>
              {data.preferredCountries.map((country, index) => (
                <span key={index} className='bg-secondary px-3 py-1 rounded-full text-sm'>
                  {country}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
