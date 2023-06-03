import styles from "../../Homepage.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../../../../apis/user";
import { useContext } from "react";
import { AuthContext } from "../../../../context";

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    pseudo: yup
      .string()
      .required("Ce champs est obligatoir")
      .min(3, "Au moins 2 caractères")
      .max(15, "Pas plus de 15 caractères"),
    pswd: yup
      .string()
      .required("Ce champs doit être saisi")
      .min(4, "Au moins 4 caractères"),
    confirmpswd: yup
      .string()
      .required("Ce champs doit être saisi")
      .oneOf([yup.ref("pswd"), ""], "Les mots de passes ne correspondent pas"),
  });

  const initialValues = {
    pseudo: "",
    pswd: "",
    confirmpswd: "",
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
      await createUser(values);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("generic", {
        type: "generic",
        message: "Pseudo déjà utilisé",
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
                {errors?.pswd && <p>{errors.pswwd.message}</p>}
              </div>

              <div className={`${styles.grp_label} d-flex flex-column m20`}>
                <label name="confirmpswd">PASSWORD CONFIRM</label>
                <input
                  type="password"
                  name="confirmpswd"
                  {...register("confirmpswd")}
                />
                {errors?.confirmpswd && <p>{errors.confirmpswd.message}</p>}
              </div>

              {errors.generic && <p>{errors.generic.message}</p>}

              <button disabled={isSubmitting} className="btn btn-primary m20">
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
