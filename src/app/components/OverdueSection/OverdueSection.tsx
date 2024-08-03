'use client';

import React, { useState } from 'react';
import {
  Divider,
  Stack,
  Typography,
  AccordionGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/joy';
import { Task } from '@/app/api/graphql/(generatedTypes)/resolversTypes';
import TaskGroup from '../TaskGroup';

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
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              Overdue{' '}
              <Typography color="danger">({data?.length || 0})</Typography>
            </Stack>
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
