import { observer } from "mobx-react";
import * as React from "react";
import ResourceModel from "../../store/models/ResourceModel";
import "./Resources.css";

export interface IResourcesProps {
  resources: ResourceModel[];
}

const Resources = observer((props: IResourcesProps) =>
  <div className="resources">
    <div className="resources-header">Resources</div>
    <div className="resources-container">
      {props.resources.map((r) =>
        <div className="resource" key={r.name}>{r.name + " - " + r.getValue}</div>,
      )}
    </div>
  </div>);

export default Resources;
