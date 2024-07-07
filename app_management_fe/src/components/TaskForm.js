import { useActionData, useNavigate, useNavigation, Form } from "react-router-dom";
import classes from "./css/TaskForm.module.css";
import Dropbox from "./Dropbox";
import MyDatePicker from "./MyDatePicker";
import { useState, useRef } from "react";
import ListElement from "./ListElement";

function TaskForm({method, event, roles}){
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const converted = JSON.parse(roles);
    const inputedReceiver = useRef();

    const priority = event ? event.get('priority') : "Normal";

    const initRecievers = event ? event.get("receivers").split(",") : [];

    const grouped = event ? event.get('personal') : true;

    const id = event ? event.get("id") : "";

    let starting = "Roled";
    if (event){
        if (event.get("personal")){
            starting="Personal";
        }
    }

    const [selectedPriority, setSelectedPriority] = useState(priority);
    const [forGroup, setForGroup] = useState(grouped);
    const [changeOccured, setChangeOccured] = useState(false);
    const [selectedRole, setSelectedRole] = useState(converted[0]);
    const [listOfRecievers, setListOfRecievers] = useState(initRecievers);

    

    let isUserListPresent = listOfRecievers.length !== 0;

    const isSubmitting = navigation.state === 'submitting';

    function handleDelete(value){
        if (!changeOccured){
            setChangeOccured(true);
        }
        console.log("within the main from" + changeOccured);
        setListOfRecievers((prev) => prev.filter((receiver) => receiver !== value));
    }

    function cancelHandler(){
        navigate('..');
    }

    function handlePriority(value) {
        setSelectedPriority(value);
    }

    function handleForGroup(value){
        setForGroup(value === "Roled");
    }

    function handleRoles(value){
        setSelectedRole(value);
    }

    function handleAdd(){
        if (!changeOccured){
            setChangeOccured(true);
        }
        console.log("within the main from" + changeOccured);
        const user = inputedReceiver.current.value;
        inputedReceiver.current.value = "";
        setListOfRecievers((prevValue) => [...prevValue, user]);
    }

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            )}
            <p>
                <label htmlFor="name" className={classes.label}>Name</label>
                <input id="name" type="text" name="name" required defaultValue={event ? event.get('name') : ''} className={classes.input}/>
            </p>
            <p>
                <label htmlFor="description" className={classes.label}>Description</label>
                <textarea id="description" type="text" name="description" required defaultValue={event ? event.get('description') : ''}/>
            </p>
            <div>
                <label htmlFor="priority" className={classes.label}>Set priority</label>
                <Dropbox options={['Normal', 'Medium', 'Urgent']} starting={selectedPriority} onChange={handlePriority}/>
                <input type="hidden" name="priority" value={selectedPriority} />
            </div>
            <div>
                <label className={classes.label}>Set starting date</label>
                <MyDatePicker />
            </div>
            <div>
                <label className={classes.label}>Set due date</label>
                <MyDatePicker />
            </div>
            <div>
                <label className={classes.label}>Select receivers</label>
                <Dropbox options={['Roled', 'Personal']} starting={starting} onChange={handleForGroup}/>
                <input type="hidden" name="isPersonal" value={!forGroup} />
                <input type="hidden" name="changed" value={changeOccured}/>
                <input type="hidden" name="id" value={id}/>
                {forGroup ?   
                    (<div>
                        <Dropbox options={converted} starting={selectedRole} onChange={handleRoles} />
                        <input type="hidden" name="role" value={selectedRole} />
                    </div>) :
                    (<div>
                        <label className={classes.label}>Type the user's name</label>
                        <input className={classes.input} ref={inputedReceiver}/>
                        {isUserListPresent &&
                            (
                            <ul className={classes.list}>
                                {listOfRecievers.map((fullName) => <li key={fullName}><ListElement name={fullName} method={handleDelete} /></li>)}
                            </ul>
                            )}
                        <input type="hidden" name="listOfRecievers" value={listOfRecievers} />
                        <button type="button" onClick={handleAdd}>Add</button>
                    </div>
                    )}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>Cancel</button>
                <button disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export default TaskForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();

    const token = localStorage.getItem('access_token');
    const list = data.get("listOfRecievers").split(",");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);

    let url = "http://localhost:8080/api/task";

    let body = {
        "name": data.get('name'),
        "description": data.get('description'),
        "startDate": "2024-06-25T10:17:45",
        "endDate": "2024-06-27T10:17:45",
        "personal": data.get("isPersonal"),
        "priority": data.get('priority'),
        "receivers" : list,
    };

    if (method === "PATCH"){
        url = url + "/update";
        body = {...body, "changed": data.get("changed"), "id": data.get("id")};
    } else {
        url = url + "/create";
    }

    console.log(body);

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify(body)
    });

    const dataAfter = await response.text();
    return dataAfter;
}