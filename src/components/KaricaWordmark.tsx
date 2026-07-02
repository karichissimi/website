/**
 * Text-based "Karica" wordmark. Same Questrial the site uses, with a
 * logo-grade twist: the "i" is a dotless stem (U+0131) in brand green whose
 * tittle is a tiny geometric leaf, glowing like a neon sign. Size is driven
 * by the caller via className (text-*).
 */
export default function KaricaWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Karica"
      className={`font-bold text-text-primary leading-none tracking-tight select-none ${className}`}
    >
      <span aria-hidden="true" className="text-gradient">
        Kar
        <span className="wordmark-i text-green-primary">
          ı
          <span className="wordmark-leaf" />
        </span>
        ca
      </span>
    </span>
  );
}
