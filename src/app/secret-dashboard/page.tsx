import BaseLayout from "@/components/BaseLayout";
import ContentTab from "@/components/content/ContentTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Page = () => {
  return (
    <BaseLayout renderIklan={false}>
      <ContentTab />
    </BaseLayout>
  );
};

export default Page;
