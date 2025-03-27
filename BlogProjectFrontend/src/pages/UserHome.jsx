import UserProfile from '../components/UserProfile';
import PostList from '../components/PostList';
import FooterTwo from '../components/FooterTwo';

const UserHome = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to My Blog!</h1>
            <p className="text-gray-600">
              Explore interesting articles on various topics.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 border border-black text-gray-600 rounded-lg hover:bg-gray-100">
                회원정보 설정
              </button>
              <button className="px-6 py-2 bg-black text-gray-600 rounded-lg hover:bg-gray-800">
                좋아요 한 게시물
              </button>
            </div>
          </div>
          <div className="w-64 h-64 bg-gray-200 rounded-xl mt-10 md:mt-0" />
        </section>

        {/* User Profile */}
        <section className="max-w-6xl mx-auto px-6 py-4">
          <UserProfile />
        </section>

        {/* Latest Articles */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-xl" />
            <h2 className="text-2xl font-bold">Latest Articles</h2>
          </div>
          <PostList />
        </section>
      </div>
      <div className="w-full">
        <FooterTwo />
      </div>
    </div>
  );
};

export default UserHome;
