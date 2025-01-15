'use client'

import { useState } from 'react';
import { Evento } from '@/types/wordpress';
import { format, parse, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DOMPurify from 'dompurify';

interface CalendarioEventosProps {
  eventos: Evento[];
}

export function CalendarioEventos({ eventos }: CalendarioEventosProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  // Filtrar eventos del día seleccionado
  const eventosDelDia = selectedDate
    ? eventos.filter((evento) => {
        const eventoDate = parse(evento.acf.inicio, 'dd/MM/yyyy hh:mm a', new Date());
        return isSameDay(selectedDate, eventoDate);
      })
    : [];

  // Validar iframe de Google Maps
  const validateIframe = (htmlString: string): boolean => {
    const sanitizedHTML = DOMPurify.sanitize(htmlString, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['src', 'width', 'height', 'style', 'allowfullscreen', 'loading', 'referrerpolicy'],
    });

    const doc = new DOMParser().parseFromString(sanitizedHTML, 'text/html');
    const iframe = doc.querySelector('iframe');

    if (!iframe) return false;

    const src = iframe.getAttribute('src');
    return src?.startsWith('https://www.google.com/maps/embed') || false;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={es}
        className="rounded-md border shadow"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">
          Eventos para el {selectedDate && format(selectedDate, 'dd MMMM yyyy', { locale: es })}
        </h3>
        {eventosDelDia.length === 0 ? (
          <p>No hay eventos para este día.</p>
        ) : (
          <ul className="space-y-4">
            {eventosDelDia.map((evento) => {
              const sanitizedHTML = DOMPurify.sanitize(evento.acf.ubicacion, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['src', 'width', 'height', 'style', 'allowfullscreen', 'loading', 'referrerpolicy'],
              });
              const isValidIframe = validateIframe(evento.acf.ubicacion);

              return (
                <li key={evento.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{evento.title.rendered}</CardTitle>
                      <CardDescription>{evento.acf.inicio}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isValidIframe && (
                        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() => setSelectedEvento(evento)}
                          >
                            Ver más
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedEvento?.title.rendered}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p>
                              <strong>Inicio:</strong>{' '}
                              {selectedEvento &&
                                format(
                                  parse(selectedEvento.acf.inicio, 'dd/MM/yyyy hh:mm a', new Date()),
                                  'dd MMMM yyyy HH:mm',
                                  { locale: es }
                                )}
                            </p>
                            <p>
                              <strong>Fin:</strong>{' '}
                              {selectedEvento &&
                                format(
                                  parse(selectedEvento.acf.fin, 'dd/MM/yyyy hh:mm a', new Date()),
                                  'dd MMMM yyyy HH:mm',
                                  { locale: es }
                                )}
                            </p>
                            <p>
                              <strong>Ubicación:</strong>{' '}
                              {selectedEvento?.acf.ubicacion}
                            </p>
                            <p>
                              <strong>Organiza:</strong> {selectedEvento?.acf.orgeniza}
                            </p>
                            <p>
                              <strong>Costo:</strong> ${selectedEvento?.acf.costo}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selectedEvento?.content.rendered || '',
                              }}
                            />
                            <Button asChild className="mt-4">
                              <a
                                href={selectedEvento?.acf.link_de_registro}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Registrarse
                              </a>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
