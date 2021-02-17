import { useState, useContext } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { ParametersContext, AppContext } from 'context'
import { Form } from 'components'
import { axios as api } from 'services'
import type { Page, Option, Parameter } from 'config/interfaces'

const UniversalPortal: any = dynamic(() => import('@jesstelford/react-portal-universal').then(({ UniversalPortal }: any) => UniversalPortal));

const Settings: NextPage<Page> = ({ process: { applicationList, showColumns } }: any): JSX.Element => {
  const [isOpen, toggle] = useState<boolean>(false),
    { setToastMessage } = useContext(AppContext),
    { parameters, updateParams } = useContext(ParametersContext),
    [paramsDB, setParamsDB] = useState<Array<Parameter>>(),
    loadApplications = ({ target: { id, innerHTML, parentNode, classList } }: any) => {
      const loadApps = () => {
        setParamsDB([]);
        updateParams({
          type: "RESET_PARAMETERS"
        });
        const html = innerHTML,
          buttons = parentNode.querySelectorAll("button");
        buttons.forEach((btn: any) => {
          btn.classList.remove("active");
          btn.setAttribute("disabled", true);
        });
        innerHTML = import("utils/convertSpinner");
        setToastMessage([]);
        api.post("parameters/applications", { id })
          .then((response: any) => {
            const { parametersEntitiesList, message, type } = response.data;
            setParamsDB(parametersEntitiesList);
            setToastMessage((toastMessage: any) => [
              ...toastMessage,
              { type: `bg-${type}`, message },
            ]);
            buttons.forEach((btn: any) => btn.removeAttribute("disabled"));
          })
          .finally(() => {
            innerHTML = html;
            classList.add("active")
          })
      }
      const paramsLength = parameters.length;
      if (paramsLength >= 1) {
        /*
        setModalBtns([
          {
            type: "primary",
            label: "Si",
            action: () => loadApps()
          },
          {
            type: "secondary",
            label: "No",
            action: () => setModalTitle(null)
          }
        ])
        setModalTitle(`Tiene ${paramsLength} modificaciones pendientes, ¿Desea continuar y perder los cambios?`);
        */
      } else {
        loadApps()
      }
    };
  return (
    <section id="pageSettings" className="container">
      <div className="col-lg-8 mx-auto">
        <h1 className="display-4">Parametros</h1>
        <p className="lead mb-0">Seleccione el proceso para listar sus parametros.</p>
        {applicationList?.map((application: string, k: number) => (
          <button
            type="button"
            key={k}
            id={application}
            className="btn btn-large btn-outline-secondary"
            onClick={
              (e: any) => loadApplications(e)
            }
          >
            {application}
          </button>
        ))}
      </div>
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <table className="table">
              <thead className={paramsDB ? "block" : "d-none"}>
                <tr>
                  {showColumns.map(
                    ({ key, value }: Option, k: number): any => (
                      <th
                        key={k}
                        scope="col"
                        className={
                          key === "regexp"
                            ? "col-2 d-none"
                            : k === 0
                              ? "col-4"
                              : "col-3"
                        }
                      >
                        <h3>{value}</h3>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {
                  paramsDB?.map((data: any | any, k: any) => (
                    <tr key={k}>
                      {Object.values(showColumns).map(
                        ({ key, value }: any, j: number) => {
                          let i = {
                            name: String(key),
                            id: `${String(key)}-${data.id}`,
                            regExp: data.regexp,
                            dataPropKey: key,
                          };
                          return (
                            <td
                              key={j}
                              className={
                                key === "regexp"
                                  ? "col-2 d-none"
                                  : j === 0
                                    ? "col-4"
                                    : "col-3"
                              }
                            >
                              {key === "value" &&
                                !!data["dataType"] &&
                                data["dataType"] === "boolean" ? (
                                  <Form.SwitchField
                                    {...i}
                                    checked={data[key] == "true"}
                                    disabled={false}
                                  />
                                ) : key
                                  .toString()
                                  .match(/propKey|description/) ? (
                                    data[key]
                                  ) : (
                                    <Form.Inputs.InputCommon
                                      {...i}
                                      type={data["dataType"]}
                                      className="form-control"
                                      value={data[key]}
                                      placeholder={String(value)}
                                      ro={key === "propKey"}
                                    />
                                  )}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  ))
                }
              </tbody>
              <tfoot className={paramsDB ? "block" : "d-none"}>
                <tr>
                  <th colSpan={3}>
                    <button
                      className="btn-lg"
                      disabled={parameters.length <= 0 ? true : false}
                      onClick={() => toggle(!isOpen)}
                    >
                      Enviar cambios
                              </button>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {isOpen && (
        <UniversalPortal selector="#modal">
          <div className="modal" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </UniversalPortal>
      )}
    </section>
  );
}

export async function getServerSideProps() {
  const allappname = await api.get('applications/allappname'),
    process = await allappname.data;
  return { props: { process } }
  /* return { props: { process: { applicationList: [], showColumns: [] } } } */
}

export default Settings
