import BaseLayout from "@/components/BaseLayout";
import BerandaPosts from "./BerandaPosts";
import ContentTab from "@/components/content/ContentTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  return (
    <BaseLayout>
      <Tabs defaultValue="recent" className="w-full mx-auto my-10 px-2">
        <TabsList className="flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto md:justify-around">
          <TabsTrigger value="recent" className="w-full md:w-auto">
            Recent
          </TabsTrigger>
          <TabsTrigger value="trending" className="w-full md:w-auto">
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <BerandaPosts orderDate={'desc'}  />
        </TabsContent>
        <TabsContent value="trending">
        <BerandaPosts orderLikes={'desc'}  />
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
};

export default Page;
