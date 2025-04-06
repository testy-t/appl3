
import Layout from "@/components/Layout";

const Services = () => {
  return (
    <Layout>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Услуга 1</h2>
              <p>Описание первой услуги, которую мы предоставляем нашим клиентам.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Услуга 2</h2>
              <p>Описание второй услуги, которую мы предоставляем нашим клиентам.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Услуга 3</h2>
              <p>Описание третьей услуги, которую мы предоставляем нашим клиентам.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
