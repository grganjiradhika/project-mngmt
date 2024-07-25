import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import Newproject from "./components/Newproject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

export default function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });
  function handleAddtask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        // setting the selected project id to undefined so that the new project page is displayed
        tasks: [...prevState.tasks, newTask],
      };
    });

  }
  function handleDeletetask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id),
        // projects array must be updated in immutable way
      };
    });

  }


  function handleSelectedproject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddproject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        // setting the selected project id to undefined so that the new project page is displayed
        selectedProjectId: undefined,
        // making a new array with the new project added
        projects: [...prevState.projects, newProject],
      };
    });
  }
  function handleDeleteproject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId),
        // projects array must be updated in immutable way
      };
    });
  }
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteproject}
    onAddTask={handleAddtask}
    onDeleteTask={handleDeletetask}
    // tasks={projectsState.tasks} tasks common to  all projects  
    // assigning tasks to individual projects 
    tasks={projectsState.tasks.filter(
      (task) => task.projectId === projectsState.selectedProjectId
    )} />

  if (projectsState.selectedProjectId === null) {
    content = <Newproject onAdd={handleAddProject} onCancel={handleCancelAddproject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectproject={handleSelectedproject}
        selectedProjectId={setProjectsState.selectedProjectId} />
      {content}
    </main>
  );
}
