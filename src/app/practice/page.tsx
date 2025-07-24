import { Suspense } from 'react';
import PracticeClientPage from './PracticeClientPage';

const PracticePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PracticeClientPage />
    </Suspense>
  );
};

export default PracticePage;