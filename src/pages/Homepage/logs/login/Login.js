import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from "../../Homepage.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../../../context";

export default function Login() {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    pseudo: yup.string().required("Ce champs doit être saisi"),
    pswd: yup.string().required("Ce champs doit être saisi"),
  });

  const initialValues = {
    pseudo: "",
    pswd: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema) });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      await signin(values);
    } catch (error) {
      setError("generic", {
        type: "generic",
        message: "Pseudo ou mot de passe incorrect",
      });
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <div className="flex-fill d-flex flex-column container p20">
          <h1>Page de profile</h1>
          <div
            className={`card flex-fill d-flex flex-column mb20 p20 ${styles.contentCard}`}>
            <form onSubmit={submit}>
              <div className={`${styles.grp_label} d-flex flex-column m20`}>
                <label name="pseudo">PSEUDO</label>
                <input type="text" name="pseudo" {...register("pseudo")} />
                {errors?.pseudo && <p>{errors.pseudo.message}</p>}
              </div>

              <div className={`${styles.grp_label} d-flex flex-column m20`}>
                <label name="pswd">PASSWORD</label>
                <input type="password" name="pswd" {...register("pswd")} />
                {errors?.pswd && <p>{errors.pswd.message}</p>}
              </div>

              {errors.generic && <p>{errors.generic.message}</p>}

              <button disabled={isSubmitting} className="btn btn-primary m20">
                Connexion
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
