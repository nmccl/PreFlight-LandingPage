import { useState } from 'react'

const INIT = 'INIT'
const SUBMITTING = 'SUBMITTING'
const ERROR = 'ERROR'
const SUCCESS = 'SUCCESS'
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const
const formStyles = {
  id: 'cmsl9g8ac2axy0j1akr5nhh84',
  name: 'Default',
  formStyle: 'buttonBelow',
  placeholderText: 'you@example.com',
  formFont: 'Inter',
  formFontColor: '#000000',
  formFontSizePx: 14,
  buttonText: 'Join Waitlist',
  buttonFont: 'Inter',
  buttonFontColor: '#000000',
  buttonColor: '#ffffff',
  buttonFontSizePx: 14,
  successMessage: "Thanks! We'll be in touch!",
  successFont: 'Inter',
  successFontColor: '#000000',
  successFontSizePx: 14,
  userGroup: '',
  team: {
    mailingLists: [],
  },
}
const domain = 'app.loops.so'

type FormState = (typeof formStates)[number]

export default function JoinWaitlistForm() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>(INIT)
  const [errorMessage, setErrorMessage] = useState('')
  const [fields] = useState<Record<string, string>>({})

  const resetForm = () => {
    setEmail('')
    setFormState(INIT)
    setErrorMessage('')
  }

  const hasRecentSubmission = () => {
    const timestamp = Date.now()
    const previousTimestamp = localStorage.getItem('loops-form-timestamp')

    if (previousTimestamp && Number(previousTimestamp) + 60 * 1000 > timestamp) {
      setFormState(ERROR)
      setErrorMessage('Too many signups, please try again in a little while')
      return true
    }

    localStorage.setItem('loops-form-timestamp', timestamp.toString())
    return false
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formState !== INIT) return
    if (!isValidEmail(email)) {
      setFormState(ERROR)
      setErrorMessage('Please enter a valid email')
      return
    }
    if (hasRecentSubmission()) return

    setFormState(SUBMITTING)

    const additionalFields = Object.entries(fields).reduce((acc, [key, val]) => {
      if (val) {
        return acc + '&' + key + '=' + encodeURIComponent(val)
      }
      return acc
    }, '')

    const formBody = `userGroup=${encodeURIComponent(formStyles.userGroup)}&email=${encodeURIComponent(
      email,
    )}&mailingLists=`

    fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
      method: 'POST',
      body: formBody + additionalFields,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm()
          setFormState(SUCCESS)
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR)
            setErrorMessage(data.message || res.statusText)
            localStorage.setItem('loops-form-timestamp', '')
          })
        }
      })
      .catch((error: any) => {
        setFormState(ERROR)
        if (error.message === 'Failed to fetch') {
          setErrorMessage('Too many signups, please try again in a little while')
        } else if (error.message) {
          setErrorMessage(error.message)
        }
        localStorage.setItem('loops-form-timestamp', '')
      })
  }

  const isInline = formStyles.formStyle === 'inline'

  if (formState === SUCCESS) {
    return (
      <div className="mx-auto w-full max-w-[400px] flex items-center justify-center">
        <p
          className="text-[#1d1d1f] dark:text-white"
          style={{
            fontFamily: `'${formStyles.successFont}', sans-serif`,
            fontSize: `${formStyles.successFontSizePx}px`,
          }}
        >
          {formStyles.successMessage}
        </p>
      </div>
    )
  }

  return (
    <>
      {formState === ERROR && <SignUpFormError errorMessage={errorMessage} />}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: isInline ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '10px',
        }}
      >
        <input
          type="text"
          name="email"
          placeholder={formStyles.placeholderText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            color: formStyles.formFontColor,
            fontFamily: `'${formStyles.formFont}', sans-serif`,
            fontSize: `${formStyles.formFontSizePx}px`,
            margin: isInline ? '0px' : '0px 0px 10px',
            width: '100%',
            maxWidth: '300px',
            minWidth: '100px',
            background: '#FFFFFF',
            border: '1px solid #D1D5DB',
            boxSizing: 'border-box',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px',
            borderRadius: '6px',
            padding: '8px 12px',
          }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', left: '-2024px' }} />
        <SignUpFormButton isInline={isInline} formState={formState} />
      </form>
    </>
  )
}

type SignUpFormErrorProps = {
  errorMessage: string
}

function SignUpFormError({ errorMessage }: SignUpFormErrorProps) {
  return (
    <div className="mx-auto w-full max-w-[400px] flex items-center justify-center mb-4">
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          color: 'rgb(185, 28, 28)',
          fontSize: '14px',
        }}
      >
        {errorMessage || 'Oops! Something went wrong, please try again'}
      </p>
    </div>
  )
}

type SignUpFormButtonProps = {
  isInline: boolean
  formState: FormState
}

function SignUpFormButton({ isInline, formState }: SignUpFormButtonProps) {
  return (
    <button
      type="submit"
      className={`inline-flex items-center justify-center ${isInline ? 'w-auto' : 'w-full'} max-w-[300px] rounded-[6px] px-[17px] py-[9px] text-[14px] font-medium leading-[20px] bg-white text-[#1d1d1f] dark:bg-[#1d1d1f] dark:text-white transition-colors duration-150`}
      style={{
        fontFamily: `'${formStyles.buttonFont}', sans-serif`,
        fontSize: `${formStyles.buttonFontSizePx}px`,
      }}
    >
      {formState === SUBMITTING ? 'Please wait...' : formStyles.buttonText}
    </button>
  )
}

function isValidEmail(email: string) {
  return /.+@.+/.test(email)
}
