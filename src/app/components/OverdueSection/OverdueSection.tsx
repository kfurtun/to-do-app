'use client';

import { useState } from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import TaskGroup from '../TaskGroup';
import { Divider } from '@mui/joy';

interface OverdueSectionProps {
  data?: Task[];
}

const OverdueSection = ({ data }: OverdueSectionProps) => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <AccordionGroup sx={{ maxWidth: 800, widht: '100%', mb: 4, pl: 0 }}>
        <Accordion
          expanded={index === 0}
          onChange={(_, expanded) => {
            setIndex(expanded ? 0 : null);
          }}
          sx={{ pl: 0, pr: 0 }}
        >
          <AccordionSummary
            sx={{
              fontWeight: 900,
              fontSize: 14,
              '& button': { color: 'black' },
            }}
          >
            Overdue
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <TaskGroup data={data} showOverdueDate={true} />
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </>
  );
};

export default OverdueSection;
