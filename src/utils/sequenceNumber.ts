export const getSequenceNumber = (sequence: number): any => {

  if (!sequence) return;

  if (sequence >= 100000) {
    return sequence;
  }

  const paddedSequence = sequence.toString().padStart(6, '0');
  return paddedSequence;
};
