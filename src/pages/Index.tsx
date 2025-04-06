
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Главная страница</h1>
        <p className="text-xl text-gray-600 mb-6">Добро пожаловать на наш сайт!</p>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <p className="mb-4">
            Это главная страница нашего простого сайта с несколькими разделами.
          </p>
          <p>
            Используйте навигационное меню вверху, чтобы перемещаться между страницами.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
