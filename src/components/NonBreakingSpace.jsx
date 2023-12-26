export const NonBreakingSpace = ({ num }) => {
  const tag = '&nbsp;'.repeat(num);

  return <span dangerouslySetInnerHTML={{ __html: tag }} />;
};
