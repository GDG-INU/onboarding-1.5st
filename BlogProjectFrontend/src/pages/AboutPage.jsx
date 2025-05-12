export default function AboutPage() {
  return (
    <main className="px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-12">
          우리는 사람들이 자신의 이야기를 공유할 수 있는 블로그 플랫폼을 만들고
          있습니다.
          <br />
          진심이 담긴 이야기가 머무는 공간, 바로 여기입니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 카드 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Simple & Clean
            </h2>
            <p className="text-gray-600 text-sm">
              복잡하지 않고 직관적인 UI/UX로 누구나 쉽게 사용할 수 있어요.
            </p>
          </div>

          {/* 카드 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Community
            </h2>
            <p className="text-gray-600 text-sm">
              좋아요, 댓글을 통해 사람들과 자유롭게 소통할 수 있어요.
            </p>
          </div>

          {/* 카드 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Open & Free
            </h2>
            <p className="text-gray-600 text-sm">
              누구나 자유롭게 글을 쓰고, 공유할 수 있어요. 우리는 열린 공간을
              지향해요.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
