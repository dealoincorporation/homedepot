import type { FC } from 'react';
import { Card } from '@/components/common';
import { CAREER_AREAS, CAREER_OPTIONS } from '@/constants';

const CareerAreas: FC = () => {
  return (
    <div className="content-wrapper mainPage">
      <div className="main-container">
        <div className="holder">
          <div className="content">
            <div className="joinUsRight">
              <div className="card-container">
                {CAREER_AREAS.map((area) => (
                  <Card
                    key={area.href}
                    title={area.title}
                    href={area.href}
                    image={area.image}
                  />
                ))}
              </div>
            </div>
            <div className="joinUsLeft">
              <h3 className="text-gray-600">Join Us Today!</h3>
              <h2>
                Discover Your Opportunity at The Home Depot Canada
                <label className="ada-information">Press ENTER to read the content or TAB to skip.</label>
              </h2>
              <div className="copy">
                <p>At The Home Depot, there's a job opportunity for everyone. Whether you're looking for part-time work, a long-term career, in-store or beyond, we're always searching for talented individuals to join our team. Once you're here, you'll discover endless possibilities to explore new roles, learn new skills, and grow your career.</p>
              </div>
              <label className="careerAeasDDM">
                <select className="mainCareerAreasDDB" aria-label="Browse All Our Career Areas">
                  {CAREER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAreas;