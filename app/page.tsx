import MatCap from "./components/MatCap";
import Scene from "./components/Scene";
import SceneRender from "./components/SceneRender";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-black">
      <MatCap />
      <SceneRender />
      <Scene />
    </main>
  );
}
