interface ProjectTableProps {
  name: string;
  client: string;
  role: string;
  stack: string;
  timeline: string;
}
export default function ProjectTable({
  name,
  client,
  role,
  stack,
  timeline,
}: ProjectTableProps) {
  return (
    <>
      <h3>{name}</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Client</th>
            <td>{client}</td>
          </tr>
          <tr>
            <th scope="row">Role</th>
            <td>{role}</td>
          </tr>
          <tr>
            <th scope="row">Stack</th>
            <td>{stack}</td>
          </tr>
          <tr>
            <th scope="row">Timeline</th>
            <td>{timeline}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
