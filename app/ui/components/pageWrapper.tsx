import PageHeader from "./pageHeader";

interface IPageWrapperProps {
  children: React.ReactNode,
  pageHeaderTitle?: string,
  pageBackPath?: string
}

export default function PageWrapper({
  children,
  pageHeaderTitle,
  pageBackPath
}: IPageWrapperProps) {

  return (
    <div className="flex flex-col p-4 h-full">
      {pageHeaderTitle && <PageHeader title={pageHeaderTitle} pageBackPath={pageBackPath} />}
      <div className="m-2" />
        {children}
    </div>
  );
}
