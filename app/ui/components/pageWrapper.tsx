import PageHeader from "./pageHeader";

interface IPageWrapperProps {
  children: React.ReactNode,
  pageHeaderTitle?: string,
  showBackButton?: boolean,
  pageBackPath?: string
}

export default function PageWrapper({
  children,
  pageHeaderTitle,
  showBackButton = false,
  pageBackPath
}: IPageWrapperProps) {
  return (
    <div className="flex flex-col p-4 h-full">
      {pageHeaderTitle && <PageHeader title={pageHeaderTitle} showBackButton={showBackButton} pageBackPath={pageBackPath} />}
      <div className="m-2" />
        {children}
    </div>
  );
}
