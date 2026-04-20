const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">
        Manage Your Tasks <span className="text-blue-600">Efficiently</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Create, organize, and track your daily Tasks in one beautiful place.
      </p>

      <a 
        href="/Tasks" 
        className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
      >
        Go to My Tasks →
      </a>
    </div>
  );
};

export default Home;