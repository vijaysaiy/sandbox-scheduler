import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectOption,
} from "@momentum-ui/react";
import { firestore } from "../../firebase-config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function EditEvent(props) {
  const [title, setTitle] = useState(props.selectedObj.title);
  const [start, setStart] = useState(
    new Date(props.selectedObj.start).getTime()
  );
  const [end, setEnd] = useState(new Date(props.selectedObj.end).getTime());
  const [description, setDescription] = useState(props.selectedObj.description);
  const [schedulertype, setSchedulerType] = useState(
    props.selectedObj.schedulertype
  );

  return (
    <Modal
      applicationId="sandbox-scheduler"
      onHide={() => props.setCreateModalStatus(false)}
      show={props.showEditModal}
      size="medium"
      htmlId="modal1"
      backdropClickExit
    >
      <ModalHeader headerLabel="Edit Event" showCloseButton />
      <ModalBody>
        <div className="container">
          <label>Title</label>
          <div className="flex-container">
            <Input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="container last">
          <label className="type">Type</label>
          <div className="flex-container">
            <Select
              defaultValue="Select Scheduler"
              className="select"
              selected={schedulertype}
              value={schedulertype}
              onSelect={(e) => {
                setSchedulerType(e[0].value);
              }}
            >
              <SelectOption value="Sandbox" label="Sandbox" />
            </Select>
          </div>
        </div>
        <div className="container">
          <label className="desc">Description</label>
          <div className="flex-container ">
            <div className="medium-10 des">
              <textarea
                selected={description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="container">
          <label>Start Date</label>
          <div className="flex-container">
            <Datetime
              dateFormat="DD/MM/YYYY"
              className="start-date"
              selected={start}
              value={new Date(start)}
              onChange={(start) => setStart(new Date(start).toString())}
            />
          </div>
        </div>
        <div className="container">
          <label>End Date</label>
          <div className="flex-container">
            <Datetime
              dateFormat="DD/MM/YYYY"
              className="end-date"
              selected={end}
              value={new Date(end)}
              onChange={(end) => setEnd(new Date(end).toString())}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          children="Delete"
          color="red"
          onClick={() => {
            deleteDoc(doc(firestore, "Events", props.selectedObj.id))
              .then(() => {
                props.setEditModalStatus(false);
              })
              .catch((error) => {
                props.setEditModalStatus(false);
              });
          }}
        />
        <Button
          children="Edit"
          type="submit"
          color="blue"
          onClick={() => {
            updateDoc(doc(firestore, "Events", props.selectedObj.id), {
              title: title,
              start: start,
              end: end,
              description: description,
              schedulertype: schedulertype ? schedulertype : null,
            })
              .then(() => {
                props.setEditModalStatus(false);
              })
              .catch((error) => {
                props.setEditModalStatus(false);
              });
          }}
        />
        <Button
          children="Close"
          onClick={() => props.setEditModalStatus(false)}
          color="default"
          id="small-1"
        />
      </ModalFooter>
    </Modal>
  );
}
