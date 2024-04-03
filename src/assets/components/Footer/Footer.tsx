import styles from "./Footer.module.scss"

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className={styles.Footer + " Footer"}>
        <div className="container">
            Footer
        </div>
    </div>
  )
}