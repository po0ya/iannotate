function createCSV( filepaths,labels,classes,destination )
%CREATECSV Creates csv file suitable for Iannotate
% [t] = createCSV( filepaths,labels,classes )

    fhandle= fopen(destination,'w');
    if(length(classes)>2)
        error('Just two classes are allowed');
    end
        fprintf(fhandle,'%d,%d\n',classes(1),classes(2));
    for i=1:length(filepaths)
        if sum(double(classes==labels(i)))>0
            fprintf(fhandle,'%s,%d\n',filepaths{i},labels(i));
        end
    end
end

