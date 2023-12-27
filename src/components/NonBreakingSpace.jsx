export const NonBreakingSpace = ({ num }) => {
  if (!num) {
    num = 1;
  }

  const tag = '&nbsp;'.repeat(num);

  return <span dangerouslySetInnerHTML={{ __html: tag }} />;
};
