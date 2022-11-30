import { articleList } from '@/articleList';
import HomeHead from '@/components/home/HomeHead';
import ArticleCard from '@/components/home/ArticleCard';
import SilhouetteCard from '@/components/home/SilhouetteCard';

const Home: React.FC = () => (
  <>
    <HomeHead />
    <div className="flex justify-center w-screen md:px-16">
      <ul className="grid grid-cols-[repeat(auto-fit,min(400px,100%))] justify-center gap-10 w-full">
        {articleList.map((metadata) => (
          <ArticleCard key={metadata.slug} metadata={metadata} />
        ))}
        <SilhouetteCard />
      </ul>
    </div>
  </>
);

export default Home;
