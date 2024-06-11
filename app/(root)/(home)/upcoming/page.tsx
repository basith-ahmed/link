import CallList from '@/components/CallList';

const UpcomingPage = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 flex flex-col gap-6">
        <div className="text-2xl font-semibold">Upcoming Meeting</div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col gap-4">
          <CallList type="upcoming" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingPage;
