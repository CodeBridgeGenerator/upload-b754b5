import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const LecturerDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.lecId)) {
                error["lecId"] = `LecId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.lecName)) {
                error["lecName"] = `LecName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.course)) {
                error["course"] = `Course field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.address)) {
                error["address"] = `Address field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            lecId: _entity?.lecId,lecName: _entity?.lecName,course: _entity?.course,address: _entity?.address,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("lecturerDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info LecturerDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in LecturerDetails" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create LecturerDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="lecturerDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="lecId">LecId:</label>
                <InputText id="lecId" className="w-full mb-3 p-inputtext-sm" value={_entity?.lecId} onChange={(e) => setValByKey("lecId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lecId"]) ? (
              <p className="m-0" key="error-lecId">
                {error["lecId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="lecName">LecName:</label>
                <InputText id="lecName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lecName} onChange={(e) => setValByKey("lecName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lecName"]) ? (
              <p className="m-0" key="error-lecName">
                {error["lecName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="course">Course:</label>
                <InputText id="course" className="w-full mb-3 p-inputtext-sm" value={_entity?.course} onChange={(e) => setValByKey("course", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["course"]) ? (
              <p className="m-0" key="error-course">
                {error["course"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(LecturerDetailsCreateDialogComponent);
