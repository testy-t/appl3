
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">О нас</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <p className="mb-4">
            Мы - небольшая компания, которая стремится предоставлять качественные услуги нашим клиентам.
          </p>
          <p className="mb-4">
            Наша команда состоит из профессионалов своего дела, которые любят свою работу.
          </p>
          <p>
            Если у вас есть вопросы, не стесняйтесь связаться с нами!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
