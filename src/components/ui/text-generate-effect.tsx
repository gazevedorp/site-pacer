/**
 * TextGenerateEffect — reveals text word by word with a fade-in animation.
 * Respects prefers-reduced-motion (shows full text immediately when reduced).
 *
 * Usage:
 *   <TextGenerateEffect text="Bem-vindo à Pacer Academia" as="h1" className="text-4xl" />
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** Delay between each word (ms) */
  wordDelay?: number;
  /** Initial delay before animation starts (ms) */
  startDelay?: number;
}

export function TextGenerateEffect({
  text,
  className,
  as: Tag = "p",
  wordDelay = 80,
  startDelay = 0,
}: TextGenerateEffectProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.4,
            delay: startDelay / 1000 + (i * wordDelay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
