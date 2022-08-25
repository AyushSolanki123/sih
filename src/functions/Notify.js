import { Notify } from "quasar";
export function notify(typeOf, message) {
  let color, actions, position;

  if (typeOf == "Success") {
    color = "#51CE66";
  } else if (typeOf == "Failed") {
    color = "#FC887B;";
  } else {
    color = "#FFCC84";
  }
  let mobileHtml = `
        <div style="padding:15px 15px 15px 0px;height:15px;display:flex;align-items:center;">
            <div style="float:left;border-left:solid 5px;border-color:${color};height:3.5rem;margin-right:15px;">
            </div>

            <div style="float:left;width:fit-content"><div style="font-size:14px;font-weight:bold">${typeOf}</div>
                <div style="font-size:11px">${message}</div>
            </div>
        </div>
    `;

  position = "bottom-right";
  actions = [{ icon: "close", color: "black", size: "sm" }];

  const notifyObject = {
    classes: "bg-white text-black q-pl-sm q-py-sm",
    message: mobileHtml,
    actions: actions,
    position: position,
    html: true,
  };

  Notify.create(notifyObject);
}
