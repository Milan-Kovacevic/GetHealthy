import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList className="sm:gap-2">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Fragment key={index}>
              {index < breadcrumbs.length && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.href} asChild>
                  {breadcrumb.href ? (
                    <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                  ) : (
                    <span>{breadcrumb.label}</span>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};
