import Task2Table from "../table/Table";
import ProjectsFormModal from "../../Pages/projects/ProjectsFormModal";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";

const doAlert = (rowData) => {
    alert(`button alert for row with id: ${rowData["ID"]} was clicked` )
}

function ProjectsTable(params) {
    const [projectsToUpdate, setProjectToUpdate] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleClose = () => {
        setShowUpdateForm(false);
    };

    const update = (project) => {
        setProjectToUpdate(project);
        setShowUpdateForm(true);
    }

    const handleSave = (project) => {
        Axios({
            url: `http://localhost:3001/project/${project.ID}`,
            method: 'PUT',
            data: project,
        }).then(_ => {
            params.refreshTable();
            setShowUpdateForm(false);
        }).catch(err => {
            alert(`could not update project: ${JSON.stringify(project)}`)
            console.error("could not update project", project, err)
        })
    }
    const handleDelete = (project) => {
        Axios({
            url: `http://localhost:3001/project/${project.ID}`,
            method: 'DELETE',
        }).then(_ => {
            params.refreshTable();
        }).catch(err => {
            alert(`could not update project: ${JSON.stringify(project)}`)
            console.error("could not update project", project, err)
        })
    }
    const tableHeadDefs = {
        extractRowKey: (rowData) => {
            return rowData["ID"]
        },
        columnDefinitions: [
            {
                columnName: "ID",
                renderCell: (rowData) => rowData["ID"],
            },
            {
                columnName: "Project number",
                renderCell: (rowData) => rowData["Project_no"], 
            },
            {
                columnName: "Project short description",
                renderCell: (rowData) => rowData["Project_short_description"],
            },
            {
                columnName: "Request date",
                renderCell: (rowData) => rowData["Request_date"],
            },
            {
                columnName: "Project start date",
                renderCell: (rowData) => rowData["Project_start_date"],
            },
            {
                columnName: "Project duration",
                renderCell: (rowData) => rowData["Project_duration"],    
            }, 
             {
                columnName: "Project currency",
                renderCell: (rowData) =>  rowData["Project_currency"],
            },
            {
                columnName: "Client",
                renderCell: (rowData) =>  rowData["Client"],
            },
            {
                columnName: "Working location",
                renderCell: (rowData) => rowData["Working_location"],
            },
            {
                columnName: "Travel required",
                renderCell: (rowData) => rowData["Travel_required"]
            },
            {
                columnName: "Team members",
                renderCell: (rowData) => rowData["Team_members"],
            },
            {
                columnName: "Working hours",
                renderCell: (rowData) => rowData["Working_hours"],
            },
            {
                columnName: "Mandatory skills",
                renderCell: (rowData) => rowData["Mandatory_skills"],
            },
            {
                columnName: "Nice to have skills",
                renderCell: (rowData) => rowData["Nice_to_have_skills"],
            },
            {
                columnName: "To Do",
                renderCell: (rowData) => rowData["To_Do"],
            },
            {
                columnName: "Actions",
                renderCell: rowData => {
                    return <><button onClick={update.bind(this, rowData)}>Update</button>
                     <button onClick={handleDelete.bind(this, rowData)}>Delete</button> </>
                } // here you can render data as well as components(for example a delete button, an update button, etc.)
            }
        ]
    };

    const tableData = params.tableData;

    // in this property you can add a component that is above the row with the column names
    // here you can insert for example a button which creates the Add Project modal and finally
    // updates the state of your Projects component(from Pages folder). Then the updated state
    // of the Projects component will be propagated in the table through parameters and render() eventually
    // being called
    const tableHeadComponent = <p></p>

    return <div>
        <h1>Projects</h1>
        <Modal show={showUpdateForm} onHide={handleClose} >
            <ProjectsFormModal handleSave={handleSave}  handleClose={handleClose}{...projectsToUpdate} ></ProjectsFormModal>
        </Modal>
        <Task2Table tableHeadDefinitions={tableHeadDefs} tableData={tableData} tableHeadComponent={tableHeadComponent}/>
    </div>
}

export default ProjectsTable
