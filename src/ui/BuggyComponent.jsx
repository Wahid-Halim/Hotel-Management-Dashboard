export function BuggyComponent() {
  throw new Error("💥 I crashed on purpose!");
  return <div>This will never be rendered</div>;
}
