import styles from "../styles/PrForm.module.sass";
import Papa from "papaparse";
import Popup from "../components/Popup";
import { createRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export const PrForm = () => {
  const [fileInputPlaceholder, setFileInputPlaceholder] = useState(
    "Drop or upload your .csv file here"
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Oops...")
  const [form, setForm] = useState<FormData>();

  const recaptchaRef = createRef<ReCAPTCHA>();

  const setAlert = (message: string, title?: string) => {
    setAlertMessage(message);
    if (title) setAlertTitle(title)
    else setAlertTitle("Oops...")

    setTimeout(() => {
      setAlertMessage("");
      setAlertTitle("");
    }, 500);
  };

  const handleFileChange = (e: any) => {
    if (e?.target?.value) {
      setFileInputPlaceholder(
        `File uploaded: ${e.target.value.replace(/.*[\/\\]/, "")}`
      );
    }
  };

  const onReCAPTCHAChange = (captchaCode: any, recaptchaRef: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early

    if (!captchaCode) {
      setAlert("reCAPTCHA token has expired, please reload and try again");
      return;
    }

    const obj: {
      name: string;
      description: string;
      logoUrl: string;
      claimUrl: string;
      symbol: string;
      addresses: { [key: string]: number };
      recaptchaToken: string;
    } = {
      name: form?.get("name") as string,
      description: form?.get("description") as string,
      logoUrl: form?.get("logoUrl") as string,
      claimUrl: form?.get("claimUrl") as string,
      symbol: form?.get("symbol") as string,
      addresses: {},
      recaptchaToken: captchaCode,
    };

    const csv: any = form?.get("csv");

    if (csv.name && csv.size) {
      Papa.parse(csv, {
        complete: (res: any) => {
          const firstColumnName = res.data[0][0];
          const secondColumnName = res.data[0][1];

          if (firstColumnName === "Wallet" && secondColumnName === "Amount") {
            res.data.slice(1).forEach((row: any) => {
              obj.addresses[row[0]] = parseFloat(row[1]);
            });
          } else {
            setAlert(
              "Please attach a CSV file that follows the given template"
            );
            return;
          }

          try {
            fetch(`${BACKEND_URL}/submit-new-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            })
              .then((res) => {
                if (res.status === 200) {
                  setAlert(
                    "Your token creation PR was submitted and will be reviewed soon"
                  );
                  return;
                } else {
                  setAlert(
                    "Unfortunately we could not complete your request, please try again later"
                  );
                  return;
                }
              })
              .catch((e) => {
                setAlert(
                  "Unfortunately we could not complete your request, please try again later"
                );
                return;
              });
          } catch (e) {
            setAlert(
              "Unfortunately we could not complete your request, please try again later"
            );
            return;
          }

          recaptchaRef.current.reset();
        },
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setForm(form);
  };

  useEffect(() => {
    if (form) {
      recaptchaRef.current && recaptchaRef.current.execute();
    }
  }, [form]);

  return (
    <>
      <Popup show={!!alertMessage} title={alertTitle} message={alertMessage} />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(captchaCode) =>
            onReCAPTCHAChange(captchaCode, recaptchaRef)
          }
          className={styles.recaptcha}
        />
        <h1 className={styles.title}>Register new Airdrops</h1>
        <div className={styles.row}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="symbol"
            id="symbol"
            placeholder="XYZ"
            required
          />
          <label htmlFor="symbol" className={styles.symbolLabel}>
            Symbol
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            required
          />
          <label htmlFor="description">Description</label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="logoUrl"
            id="logoUrl"
            placeholder="Logo URL"
            required
          />
          <label htmlFor="logoUrl">Logo URL</label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="claimUrl"
            id="claimUrl"
            placeholder="Claim URL"
            required
          />
          <label htmlFor="claimUrl">Claim URL</label>
        </div>
        <div className={styles.fileWrapper}>
          <input
            type="file"
            accept=".csv"
            name="csv"
            id="csv"
            onChange={(e) => handleFileChange(e)}
          />
          <label htmlFor="csv">CSV File</label>
          <span>{fileInputPlaceholder}</span>
          <a href="/Token Register Template.csv" download>
            Get the template
            <img src="/iconDownload.png" alt="Download icon" />
          </a>
        </div>
        <button className={styles.submitCta} type="submit">
          Send Airdrops
        </button>
      </form>
    </>
  );
};

export default PrForm;
