import HomeContent from "./_components/PageContent";
import {actionGetTask} from './actions';

export default async function Home() {
const data = await actionGetTask();

  return (
    <HomeContent initialData={data}/>
  );
}
