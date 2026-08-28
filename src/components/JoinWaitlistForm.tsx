import { useState } from "react";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;

const formStyles = {
  id: "cmsl9g8ac2axy0j1akr5nhh84",
  placeholderText: "you@example.com",
  buttonText: "Join Waitlist",
  successMessage: "You're on the list.",
  userGroup: "",
};

const domain = "app.loops.so";

type FormState = (typeof formStates)[number];

export default function SignUpFormReact() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>(INIT);
  const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  const resetForm = () => {
    setEmail("");
    setFormState(INIT);
    setErrorMessage("");
    setExpanded(false);
  };

  const hasRecentSubmission = () => {
    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem(
      "loops-form-timestamp"
    );

    if (
      previousTimestamp &&
      Number(previousTimestamp) + 60 * 1000 > timestamp
    ) {
      setFormState(ERROR);
      setErrorMessage(
        "Too many signups, please try again in a little while"
      );
      return true;
    }

    localStorage.setItem(
      "loops-form-timestamp",
      timestamp.toString()
    );

    return false;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (formState !== INIT) return;

    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (hasRecentSubmission()) return;

    setFormState(SUBMITTING);

    const formBody =
      `userGroup=${encodeURIComponent(formStyles.userGroup)}` +
      `&email=${encodeURIComponent(email)}` +
      `&mailingLists=`;

    fetch(
      `https://${domain}/api/newsletter-form/${formStyles.id}`,
      {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res: Response) =>
        Promise.all([res.ok, res.json(), res])
      )
      .then(([ok, data, res]) => {
        if (ok) {
          setFormState(SUCCESS);
        } else {
          const response = data as { message?: string };

          setFormState(ERROR);
          setErrorMessage(
            response?.message || res.statusText
          );

          localStorage.setItem(
            "loops-form-timestamp",
            ""
          );
        }
      })
      .catch((error: Error) => {
        setFormState(ERROR);

        if (error.message === "Failed to fetch") {
          setErrorMessage(
            "Too many signups, please try again in a little while"
          );
        } else if (error.message) {
          setErrorMessage(error.message);
        }

        localStorage.setItem(
          "loops-form-timestamp",
          ""
        );
      });
  };

  // SUCCESS
  if (formState === SUCCESS) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "999px",

            background:
              "rgba(120, 120, 128, 0.10)",

            border:
              "1px solid rgba(120, 120, 128, 0.16)",

            color:
              "var(--framer-color-text, #1d1d1f)",

            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, sans-serif",

            fontSize: "14px",
            fontWeight: 500,

            boxShadow:
              "0 1px 2px rgba(0,0,0,0.05)",

            backdropFilter:
              "blur(20px)",

            WebkitBackdropFilter:
              "blur(20px)",
          }}
        >
          <span
            style={{
              color: "#34C759",
              fontSize: "15px",
            }}
          >
            ✓
          </span>

          {formStyles.successMessage}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ERROR */}
      {formState === ERROR && (
        <div
          style={{
            marginBottom: "10px",
            textAlign: "center",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif",
            fontSize: "13px",
            color: "#FF3B30",
          }}
        >
          {errorMessage ||
            "Something went wrong. Please try again."}
        </div>
      )}

      {/* COLLAPSED BUTTON */}
      {!expanded ? (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            setFormState(INIT);
            setErrorMessage("");
          }}
          style={{
            appearance: "none",
            WebkitAppearance: "none",

            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",

            height: "46px",
            padding: "0 21px",

            borderRadius: "999px",

            border:
              "1px solid rgba(120, 120, 128, 0.20)",

            background:
              "var(--framer-color-background, rgba(255,255,255,0.82))",

            color:
              "var(--framer-color-text, #1d1d1f)",

            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, sans-serif",

            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "-0.01em",

            boxShadow:
              "0 1px 2px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.05)",

            backdropFilter:
              "blur(20px) saturate(180%)",

            WebkitBackdropFilter:
              "blur(20px) saturate(180%)",

            cursor: "pointer",

            transition:
              "transform 150ms ease, box-shadow 150ms ease, background 150ms ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform =
              "translateY(-1px)";

            event.currentTarget.style.boxShadow =
              "0 2px 5px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.07)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform =
              "translateY(0)";

            event.currentTarget.style.boxShadow =
              "0 1px 2px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.05)";
          }}
          onMouseDown={(event) => {
            event.currentTarget.style.transform =
              "scale(0.98)";
          }}
          onMouseUp={(event) => {
            event.currentTarget.style.transform =
              "translateY(-1px)";
          }}
        >
          {formStyles.buttonText}

          <span
            style={{
              color: "#86868B",
              fontSize: "16px",
              lineHeight: 1,
            }}
          >
            →
          </span>
        </button>
      ) : (
        /* EXPANDED FORM */
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "420px",

              display: "flex",
              alignItems: "center",
              gap: "6px",

              padding: "5px",

              borderRadius: "999px",

              border:
                "1px solid rgba(120, 120, 128, 0.20)",

              background:
                "var(--framer-color-background, rgba(255,255,255,0.82))",

              boxShadow:
                "0 1px 2px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.05)",

              backdropFilter:
                "blur(20px) saturate(180%)",

              WebkitBackdropFilter:
                "blur(20px) saturate(180%)",

              boxSizing: "border-box",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder={formStyles.placeholderText}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (formState === ERROR) {
                  setFormState(INIT);
                  setErrorMessage("");
                }
              }}
              required
              autoComplete="email"
              autoFocus
              style={{
                flex: 1,
                minWidth: 0,

                border: "none",
                outline: "none",

                background: "transparent",

                padding:
                  "10px 13px",

                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif",

                fontSize: "14px",

                color:
                  "var(--framer-color-text, #1d1d1f)",

                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={formState === SUBMITTING}
              style={{
                flexShrink: 0,

                height: "36px",

                padding: "0 16px",

                border: "none",
                borderRadius: "999px",

                background:
                  "var(--framer-color-text, #1d1d1f)",

                color:
                  "var(--framer-color-background, #ffffff)",

                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif",

                fontSize: "13px",
                fontWeight: 500,

                cursor:
                  formState === SUBMITTING
                    ? "default"
                    : "pointer",

                opacity:
                  formState === SUBMITTING
                    ? 0.55
                    : 1,

                transition:
                  "opacity 150ms ease, transform 150ms ease",
              }}
            >
              {formState === SUBMITTING
                ? "Joining…"
                : "Join"}
            </button>
          </form>

          <button
            type="button"
            onClick={resetForm}
            style={{
              marginTop: "9px",

              border: "none",
              background: "transparent",

              color: "#86868B",

              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif",

              fontSize: "12px",

              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

function isValidEmail(email: string) {
  return /.+@.+/.test(email);
}