export function Disclaimer({ children, title }: { children: string; title?: string }) {
  return (
    <div className="warn" role="note">
      <span style={{ fontSize: 22 }} aria-hidden>
        ℹ︎
      </span>
      <div>
        {title ? <b>{title} </b> : null}
        {children}
      </div>
    </div>
  );
}
