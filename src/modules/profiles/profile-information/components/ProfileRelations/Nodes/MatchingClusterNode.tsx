export function MatchingClusterNode(props: { content?: any; inputs?: any }) {
  const { inputs } = props;
  console.log("inputs are", inputs, props);
  return (
    <>
      {" "}
      <div className={"bg-blue-200 border  rounded-md border-blue" + "-400"}>
        <div className={"p-2"}>{props?.content}</div>
      </div>
    </>
  );
}
