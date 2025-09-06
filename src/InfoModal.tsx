import { Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaInfoCircle } from 'react-icons/fa';

export function InfoModal() {
  const [modalShown, { open, close }] = useDisclosure();

  return (
    <>
      <Flex
        pos="absolute"
        bottom={10}
        right={10}
        gap={10}
        justify="center"
        align="center"
      >
        <a href="https://owenmoogk.github.io">Owen Moogk</a>
        <FaInfoCircle onClick={() => open()} />
      </Flex>
      <Modal
        opened={modalShown}
        onClose={close}
        title="Wave Function Collapse"
        size="lg"
      >
        <p>
          This website is designed with the intention of visualising the process
          of a wave function collapse to get to a desired result... but what
          even is a wave function?
          <br />
          <br />
          Formally, it is "a variable quantity that mathematically describes the
          characteristics of a system." Essentially, we can take an unsolved
          system with many unknowns, and set out rules that the system must
          obey. In this case, it must obey the rules of a sudoku.
          <br />
          <br />
          Then, we can systematically choose values for each cell that satisfy
          the rules (known as 'collapsing' the wave function), and converge upon
          a solution. However, there may sometimes be error in the chosen
          values, which is why backtracking is necessary (this is shown by red
          cells with an "!").
          <br />
          <br />
          Why is it powerful? It is much faster than brute force, and is an
          intelligent way to approach many problems where constraints propagate.
          It's unique in that it does not only solve problems with one solution
          (you can submit an empty board and see what happens as an example).
          <br />
          <br />
          Applications of this include{' '}
          <a href="https://bolddunkley.itch.io/wfc-mixed">
            terrain generation for video games
          </a>
          , and quantum mechanics (which I'm definitely not qualified to talk
          about)!
          <br />
          <br />
          For more details have a look at the{' '}
          <a href="https://owenmoogk.github.io/projects/wave-function-collapse">
            project page
          </a>{' '}
          on my website.
        </p>
      </Modal>
    </>
  );
}
